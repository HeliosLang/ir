# IR
Helios-lang Intermediate Representation (IR) library. This library takes care of:
  - Mutual recursion
  - Static analysis
  - Optimization
  - Detection of final dependencies
  - UPLC generation

The IR doesn't support operators.

## Syntax

The Helios-lang IR is low-level human readable programming language with a very simple syntax:
```
__helios__value__contains_policy = (self) -> {
    (mph) -> {
        mph = __helios__mintingpolicyhash____to_data(mph);
        recurse = (map) -> {
            __core__chooseList(
                map,
                () -> {false},
                () -> {
                    __core__ifThenElse(
                        __core__equalsData(__core__fstPair(__core__headList__safe(map)), mph),
                        () -> {true},
                        () -> {recurse(__core__tailList__safe(map))}
                    )()
                }
            )()
        };
        recurse(self)
    }
};
...
```

The Helios-lang IR is stripped down version of the Helios language itself. Type annotations have been removed, assignments are only possible for single values. There are no `const` or `func` statements and everything is an expression.

### Assignment

Assignment is syntactic sugar for a literal function passed as an arg to another literal function.

For example:
```
x = <expr-x>;
<expr-next>
```

Becomes:

```
(x) -> {
    <expr-next>
}(<expr-x>)
```

Many subsequent assignments look like:

```
(x) -> {
    (y) -> {
        (z) -> {
            <expr-nexts>
        }(<expr-z>)
    }(<expr-y>)
}(<expr-x>)
```

## Mutual recursion

UPLC doesn't allow mutual recursion directly, so function definitions that appear after the expressions where they are being used must be injected.

For example:
```
a = b();

b = () -> {
    a
};

b()
```

Becomes:

```
a = (b) -> {
    b(b)()
};

b = (b) -> {
    () -> {
        a(b)
    }
};

b(b)()
```

Reshuffling to avoid mutual recursion should be done in a way that preserves the original order as much as possible. Once a set of mutually recursive expressions are detected they should be left in the same order. This is done because the compiler has no idea how frequently each function will be called. 

#### How to detect a set of mutually dependent expressions

A graph is first created of all assigned expressions in a scope. The indirect dependencies are pushed until all nodes are aware of all dependencies. Then loop through the list of nodes in original order:
  - and node that depends on itself is (mutually) recursive
    - if any of the other dependencies don't depend on the same node, continue
    - if none of the other dependencies depend on the same node, collect all these nodes (assuring the same for each), and copy into the final list
  - if some of dependencies haven't been copied to the new list yet, continue
  - if all dependencies have been copied, copy the current node as well


#### Infinite loop handling

Will be detected during static analysis phase

### Scopes

Although subsequent assignments form nested AST elements, they are treated as being part of the same scope. Scope boundaries are formed by function literals that aren't called immediately.

## Optimizaton

### Common sub-expression factorization

Common sub-expressions should be hoisted. For this to work each expression must have a unique key. Variable names must be unique in case of shadowing.

Expressions stringified in such a way form the keys mapping to those original expressions.

For example:
```
a = <common-expr>;

b = <common-expr>;

a + b
```

Becomes:

```
common = <common-expr>;

a = common;

b = common;

a + b
```

One of the difficulties is lifting of common sub-expressions:

```
fn_a = () -> {
    x = <common-expr>;
    ...
};

fn_b = () -> {
    y = <common-expr>;
    ...
};

fn_a() + fn_b()
```

This optimization algorithm must thus be aware of branches. Hence it makes sense to use information from the static analysis.