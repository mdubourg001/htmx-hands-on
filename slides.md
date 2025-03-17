---
theme: "@ekino/slidev-theme-ekino"
title: HTMX - Hands-on
---

# HTMX - Hands-on

Philosophie, prise en main, avantages et inconvénients...

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

- JavaScript s'est installé comme une solution à tout les problèmes du développement web moderne, y compris ceux qu'il a lui-même créé : _besoin d'interactivité → donc SPA → donc gestion du routing côté client → mais mauvais SEO → donc SSR + hydratation → mais rendu complet à chaque navigation → donc RSC → etc..._
- On réécrit tout, tout le temps : React class components → function components, React Redux → State local, Vue 2 → Vue 3, Ng Observables → Signaux, etc... : _#fatigue_. [La durée moyenne d'une ligne de code est de 2,4 ans](https://pmc.ncbi.nlm.nih.gov/articles/PMC7959608/)
- Une séparation s'est créée entre Frontend et Backend
- JSON s'est imposé comme format de communication entre les deux : non typé, nécessitant une re-validation côté client (zod, GraphQL, etc...) et une documentation tierce (Swagger, OpenAPI, etc...)
- Tout cela a un coup : [la taille moyenne d'une page web > 2.5Mo](https://almanac.httparchive.org/en/2024/page-weight)

</v-clicks>

---

# Philosophie d'HTMX

- Remettre HTTP et HTML au coeur de nos solutions techniques web
- Utiliser JavaScript uniquement quand c'est nécessaire

---

# Philosophie d'HTMX

> [**HATEOAS**](https://fr.wikipedia.org/wiki/HATEOAS) : _Hypermedia As The Engine Of Application State_

<br />

- Hypermedia : HyperText (texte + liens) + Media (images, vidéos, etc...)
- Contrainte de base de l'architecture REST
- Principe : un client d'application interragit uniquement avec un serveur via des liens dynamiques fournis par le serveur lui-même. Les capacités de l'application sont donc auto-découvrables par le client, sans besoin d'une documentation externe.

<br />

<div class="flex gap-4">

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
