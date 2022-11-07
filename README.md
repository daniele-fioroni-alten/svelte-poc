# Svelte

Svelte is an SFC compiler.

## SFC structure

_SomeComponent.svelte_:
```html
<script>
    let title = 'hello';
</script>

<h1>{title}</h1>

<p>some other text/html contents</p>

<style>
    h1 {
        color: red;
    }
</style>
```

Typescript and scss are supported.

```html
<script lang="ts"></script>

<style lang="scss"></style>
```

## Reactivity

Every variable assignment is reactive.

```html
<script>
    let count = 0;
</script>

{count}

<button on:click={() => count += 1}>
    Increment
</button>
```

`$:` label marks a reactive _statement_, it's basically the way to create **computed properties** or trigger **side effetcs**.

```javascript
// a computed property
$: counterMessage = `Count is ${count}.`;

// a side-effect
$: {
    console.log(`Count changed: "${count}"`);
    console.log(`Count changed: "${count}"`);
}
```

Exporting a variable makes it a component prop.

```javascript
// component will accept a "people" prop
export let people = []; // <-- default value
```

Two-way data binding is the preferred parent-child comunication technique.

_ChildComponent.svelte_:
```html
<script>
    export let isChecked = false;
</script>

<input type="checkbox" bind:checked={isChecked} squared={true} />
```

_ParentComponent.svelte_:
```html
<script>
    import ChildComponent from './ChildComponent.svelte';

    let isChecked = true;
</script>

<ChildComponent bind:isChecked={isChecked} />
```

Custom events are still possible.

_ChildComponent.svelte_:
```html
<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<button on:click="{() => dispatch('notify', 'foobar')}">Fire Event</button>
```

_ParentComponent.svelte_:
```html
<script>
    import ChildComponent from './ChildComponent.svelte';

    function log(msg) {
        console.log(msg);
    }
</script>

<ChildComponent on:notify="{log}">Fire Event</button>
```

## SFC text/HTML area

Text expressions are ensured through a pair of curly brackets.

```html
<script>
    const title = '👋🏻 hello';
</script>

<h1>{title}</h1>
```

Conditional statements are expressed with `{#if}` (and `{:else}`).

```html
<script>
    export let title = '';
</script>

{#if title}
    <h1>{title}</h1>
{:else}
    <span>No title</span>
{/if}
```

Arrays iterations are expressed with `{#each}`.

```html
<script>
    const fruits = ['🍒', '🥑']:
</script>

{#each value as fruit}
    <span>{fruit}</span>
{/each}
```

Slots

Template transclusion is possible through `<slot />` elements, which can be named.

_ChildComponent.svelte_:
```html
<div>
    <slot name="before"></slot>

    <p>...</p>

    <slot name="after"></slot>
</div>
```

_ParentComponent.svelte_:
```html
<ChildComponent>
    <svelte:fragment slot="before">
        contents...
    </svelte:fragment>
    
    <footer slot="after">
        @ footer TM
    </footer>
</ChildComponent>
```

Window/Body references

`<svelte:window />` and `<svelte:body />` elements allows to bind and automatically unbind events to `window` and `<body />` from components (without the risk of memory leaks).

```html
<svelte:window on:resize={handler}/>

<svelte:body on:mouseenter={handler} />
```

`<svelte:window />` allows some data-binding too.

```html
<script>
    let winScrollY = 0;
</script>

<svelte:window bind:scrollY={winScrollY} />
```

Dynamic elements/components

`<svelte:element />` allows to render html elements with a dynamic tagName.

```html
<script>
    let tagName = 'div';
</script>

<svelte:element this={tagName} />
```

`<svelte:component />` allows to render svelte components dynamically.

```html
<script>
    import ComponentA from './ComponentA.svelte';
</script>

<svelte:component this={ComponentA} />
```

Recursive components

`<svelte:self />` allows to render svelte components recursively (without the risk of infinite loops).

```html
<script>
    export let list = [1, 2, 3, [4, 5, 6]];
</script>

<ul>
    {#each list as item}
        <li>
            {#if Array.isArray(item)}            
                <svelte:self list={item}></svelte:self>
            {:else}
                {item}
            {/if}
        </li>
    {/each}
</ul>
```

## Shared state

With the `writable` function it's possible to define a shared application state.

```javascript
import { writable } from 'svelte/store';

// defines a store with an initial value
export const count = writable(0);

// logs everytime the value changes
const unsubscribe = count.subscribe(console.log);

// changes the store value
count.set(1);

// changes the store value based on the current on
count.update(n => n + 1);

// stop the logging
unsubscribe();
```

`$` prefix automatically subscribes and unsubscribes to stores in components (without the risk of memory leaks).

_SomeComponent.svelte_:
```html
<script>
    import { writable } from 'svelte/store';

    const count = writable(0);

    console.log($count); // logs 0

    $count = 1

    console.log($count); // logs 1
</script>
```

With the `derived` function it's possible to create a shared state starting from other stores value.

```javascript
import { derived } from 'svelte/store';

const sum = derived(
    // other stores
    [count, anotherCount],
    
    // computation
    ([$count, anotherCount]) => $count + $anotherCount, 
    
    // initial value
    0,
);
```

## SvelteKit

A Svelte framwork which includes a router, build optimizations, offline support, pages prefetch and configurable rendering.

For this reason, SvelteKit is meant to be both a server and a client application, and the files are arranged accordingly: this way some files remains concealed from the the client.

### Scaffolding
```
| static
| tests
| src
| └── lib
|     └── server
| └── routes
| └── params
```

### src/lib folder

Code shared by multiple pages, components, utilities, typescript models, and client-side code in general.

### src/lib/server folder

Code shared by multiple parts of server code, this won't be exposed to the client-side. If some code from this folder is imported in the client-side an error is arised.

### src/lib/routes folder

SvelteKit router is filesystem-based: every folder inside _routes_ folder would be an application route, every file with name starting with a `+` is a route file.

#### +page files

```
| src
| └── routes
|     └── products
|         └── +page.svelte
|         └── +page.js
|         └── +page.server.js
|         └── +server.js
```
* **+page.svelte**: The page SFC component.
    ```html
    <script>
        import { page } from '$app/stores';

        export let post = $page.data.post;
    </script>

    {#if post}
        <h1>{post.title}</h1>

        <p>{post.body}</p>
    {/if}
    ```

* **+page script**: used to retrieve data to be displayed in the page component, or to apply route-protection logics and perform redirects. All of this can be done in an exported `load` function.
    ```javascript
    import { redirect } from '@sveltejs/kit';
    import { someCondition } from '$lib/some-guard-logic';

    export const load = async (e) => {
        if( someCondition() ){
            throw redirect(302, '/user/login');
        }

        return { post: { title: 'hello', body: 'lorem ipsum' } }
    };
    ```
    
* **+page.server script**: same as _+page_ script, but it's not exposed to the client part.
    ```javascript
    export const load = (event) => {
        // something which should stay hidden from client...
    }
    ```

    It can also export an `actions` object, which includes `POST` call which can be consumed by `form` elements.

    _routes/user/+page.js_:
    ```javascript
    export const load = (event) => ({
        user: event.locals.user
    });

    export const actions = {
        default: () => ({ message: 'hi' }),

        logout: () => ({ user: null }),
    };
    ```

    _SomeComponent.svelte_:
    ```html
    <form method="POST" action="/user">
        ...
    </form>

    <form method="POST" action="/user?/logout" use:enhance>
        ...
    </form>
    ```

* **+server script**: can be used to write REST APIs routes.
    ```javascript
    export const GET = () => new Response('ok');

    export const POST = () => new Response('ook');
    ```

#### +layout files

```
| src
| └── routes
|     └── products
|         └── +layout.svelte
|         └── +layout.js
|         └── +layout.server.js
|         └── +error.svelte
```
Basically the same as `+page` files, but with higher priority.

`+layout.svelte` can be used with `<slot>` elements to render common parts of the ui, while `+layout` script `load` function gets executed before the `+page` script `load` function.

#### Routes groups

Creating a route with name wrapped by round brackets it doesn't affect routing (there won't be a route with that name) and it defines a group instead, with is useful to set common layouts areas.

```
| src
| └── routes
|     └── (a-group-name)
|         └── +layout.svelte
|         └── +error.svelte
|         └── products
|             └── +page.js
|         └── fashion-show
|             └── +page.js
```

#### Params

Routes dynamic parts are expressed with squared brackets in folders names.

```
| src
| └── routes
|     └── products
|         └── product-[dynamicParamIddd]
|             └── [[optionalParammm]]
|                 └── [...otherUnknownListOfParamsss]
```

#### src/params folder

Params can be sanitized and formatted with Matchers which lays in this folder. Every matcher shall export a `match` function which shall return a boolean, if `false` is return the route throws a 404 error.

```
| src
| └── routes
|     └── products
|         └── [productId=integer]
| └── params
|     └── integer.js
```

```javascript
export const match = (param) => /^\d+$/.test(param);
```

#### Page options

`+page` scripts and `+layout` scripts can export **page options**.

```javascript
/* Rendered by the build. When two users hitting a page must get the same content from the server. */
export const prerender = false;

/* Rendered by the server. Normally the page is rendered on the server first and its HTML is sent to the client where it's hydrated. If ssr is set to false, an empty shell is sent to the client instead. */
export const ssr = false;

/* For pages which don't require JavaScript at all — many blog posts and 'about' pages fall into this category. */
export const csr = false;
```

## Extras refs

* https://www.youtube.com/watch?v=6MI9mirMh6w