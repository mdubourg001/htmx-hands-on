# HTMX - Hands-on

Ceci est un hands-on pour introduire la librairie [HTMX](https://htmx.org/).

Les slides sont réalisées avec Vitest et peuvent être consultées localement : 

```bash
nvm install 22
pnpm install
pnpm dev
```

## Déroulé du hands-on

Le hands-on consiste à l'ajout d'attributs HTMX à une application de todolist.

Le projet se trouve dans le répertoire [`project/`](./project/).

```bash
git clone git@github.com:mdubourg001/htmx-hands-on.git
nvm install 22
pnpm install
```

Chaque étape du hands-on est une branche du repository et contient la solution de l'étape précédente..

- `step-1` : Ajouter les attributs HTMX nécessaires à l'ajout d'une tâche dans la todolist
- `step-2` : Ajouter les attributs HTMX nécessaires au changement de statut et à la suppression d'une tâche
- `step-3` : Ajouter les attributs HTMX nécessaires à la mise à jour de la todolist automatique via un SSE

Pour commencer une étape, il suffit de se placer sur la branche correspondante et de lancer le serveur de développement :

```bash
git switch step-1
pnpm dev
```

## FAQ

### Je n'ai pas nvm, comment installer Node 22 ?

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 22
```

### Je n'ai pas pnpm, comment l'installer ?

```bash
npm install -g pnpm
```

### Je veux passer à l'étape suivante, comment faire ?

```bash
git stash .
git switch step-2
```
