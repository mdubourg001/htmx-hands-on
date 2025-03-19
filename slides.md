---
theme: "@ekino/slidev-theme-ekino"
title: HTMX - Hands-on
---

# HTMX - Hands-on

Philosophie, prise en main, avantages et inconvénients...

<small>_Inspiré du [talk "HTMX" à BDX I/O 2024 par Stéphane Trebel](https://www.youtube.com/watch?v=szSXNi77VLo)_</small>

---
layout: title
---

# Introduction


---

# Qu'est-ce que HTMX ?

<v-clicks>
  <div class="flex items-center mt-16">
    <img class="max-w-2/3 border" src="https://htmx.org/img/memes/bellcurve2.png" alt="Bell Curve Meme">
  </div>
</v-clicks>

---

# Qu'est-ce que HTMX ?

Une librairie JavaScript permettant de déclencher des requêtes HTTP via des attributs HTML, et de mettre à jour le DOM avec les réponses associées.

_Exemple :_

```html
<!-- GET / -->
<script src="https://unpkg.com/htmx.org@2.0.4"></script>

<div id="content"></div>
<button hx-post="/clicked" hx-target="#content" hx-swap="outerHTML">
  Clique !
</button>
```

<br />

```html
<!-- GET /clicked -->
<div id="content">
  <p>Vous avez cliqué !</p>
</div>
```

---

# Constats / Origines d'HTMX

<v-clicks>

- **JavaScript s'est installé comme une solution à tous les problèmes** du développement web moderne, y compris ceux qu'il a lui-même créé : _besoin d'interactivité → donc SPA → donc gestion du routing côté client → mais mauvais SEO → donc SSR + hydratation → mais rendu complet à chaque navigation → donc RSC → etc..._
- **On réécrit tout, tout le temps** : React class components → function components, React Redux → State local, Vue 2 → Vue 3, Ng Observables → Signaux, etc... : _#fatigue_. [La durée moyenne d'une ligne de code est de 2,4 ans](https://pmc.ncbi.nlm.nih.gov/articles/PMC7959608/)
- **Une séparation s'est créée entre Frontend et Backend**
- **JSON s'est imposé** comme format de communication entre les deux : non typé, nécessitant une re-validation côté client (zod, GraphQL, etc...) et une documentation tierce (Swagger, OpenAPI, etc...)
- Tout cela a un coup : **[la taille moyenne d'une page web > 2.5Mo](https://almanac.httparchive.org/en/2024/page-weight)**

</v-clicks>

---

# Philosophie d'HTMX

<v-clicks>

- Remettre HTTP et HTML au coeur de nos solutions techniques web : **Architecture HDA** ([Hypermedia Driven Application](https://htmx.org/essays/hypermedia-driven-applications/))
- **Utiliser JavaScript uniquement quand c'est nécessaire**
- Garantir une **rétrocompatibilité** forte et à long terme

</v-clicks>

---

# [**HATEOAS**](https://fr.wikipedia.org/wiki/HATEOAS) : _Hypermedia As The Engine Of Application State_

<v-clicks>

- **Hypermedia** : HyperText (texte + liens) + Media (images, vidéos, etc...)
- Contrainte de base de l'architecture **REST**
- Principe : un client d'application interragit uniquement avec un serveur via des liens dynamiques fournis par le serveur lui-même. **Les capacités de l'application sont donc auto-découvrables par le client**, sans besoin d'une documentation externe.

</v-clicks>

<br />

<div v-click class="flex gap-4">

```html
<!-- GET /account -->
<div id="account">
  <p>Solde : 100.00</p>
  <a href="/account/deposit">Dépot</a>
  <a href="/account/withdraw">Retrait</a>
  <a href="/account/transfer">Transfert</a>
  <a href="/account/close">Clôturer le compte</a>
</div>
```

```html
<!-- GET /account -->
<div id="account">
  <p>Solde : -10.00</p>
  <a href="/account/deposit">Dépot</a>
</div>
```

</div>

---

# [**AJAX**](<https://fr.wikipedia.org/wiki/Ajax_(informatique)>) : _Asynchronous JavaScript And XML_

- Principe : effectuer des requêtes HTTP asynchrones depuis le navigateur vers le serveur web et modifier le DOM en conséquence sans recharger la page.

---
layout: title
---

# Utilisation

---

# Attributs : `hx-get`, `hx-post`, `hx-put`, `hx-patch`, `hx-delete` ... `="/url"`

**Déclenche une requête avec le verbe HTTP donné vers l'URL donné.**

_Exemple :_

```html
<button hx-put="/upvote">
  Upvote
</button>
```

_Traduction :_

> "Quand l'utilisateur clique sur le bouton, envoie une requête PUT vers _`/upvote`_."

---

# Attributs : `hx-trigger="event"`

**Spécifie l'event DOM qui déclenchera la requête définie par `hx-get`, `hx-post`, ...**

_Exemple :_

```html
<a href="/contact" hx-post="/analytics" hx-trigger="mouseenter">
  Nous contacter
</button>
```

_Traduction :_

> "Quand le curseur de l'utilisateur entre dans le bouton, envoie une requête POST vers _`/analytics`_."

<br />

- Des valeurs par défaut sont définies pour chaque élément HTML : `"change"` pour les input et select, `"submit"` pour les formulaires, `"click"` pour tous les autres éléments
- Des _"modifiers"_ peuvent être spécifiés afin d'affiner le comportement, exemple : `hx-trigger="mouseenter once delay:500ms"`

--- 

# Attributs : `hx-target="#selector"`

**Spécifie l'élément du DOM qui sera mis à jour avec la réponse à la requête définie par `hx-get`, `hx-post`, ...** (par défaut, l'élément déclencheur).

_Exemple :_

```html
<input 
  name="q"
  hx-get="/search"
  hx-trigger="keyup delay:500ms"
  hx-target="#search-results"
  placeholder="Search..."
>
<div id="search-results"></div>
```

_Traduction :_

> "500ms après que l'utilisateur ait tapé une lettre dans le champ de recherche, envoie une requête GET vers _`/search`_ et met à jour le contenu de _`#search-results`_ avec la réponse."

---

# Attributs : `hx-swap="strategy"`

**Spécifie la stratégie de mise à jour de l'élément du DOM avec la réponse à la requête définie par `hx-get`, `hx-post`, ...** (par défaut, `"innerHTML"`).

_Exemple :_

```html
<button hx-put="/upvote" hx-swap="outerHTML">
  Upvote
</button>
```

_Traduction :_

> "Quand l'utilisateur clique sur le bouton, envoie une requête PUT vers _`/upvote`_ et remplace le bouton par la réponse."

<br />

- Valeurs possibles : `"innerHTML"`, `"outerHTML"`, `"afterbegin"`, `"beforebegin"`, `"afterend"`, `"beforeend"`, `delete`, `"none"`

---
layout: title
---

# Hands-on

---

# Hands-on

```bash
git clone git@github.com:mdubourg001/htmx-hands-on.git

cd project/
nvm install 22 # optionnel
pnpm install
```

---

# Hands-on / étape 1

```bash
git switch step-1
pnpm dev
```

<br />

## Objectif : 

---
layout: "thank_you"
---