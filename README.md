Pour installer le projet il faut installer nodejs via le site de node: https://nodejs.org/en/

Il faut également installer GIT sur le site de github : https://git-scm.com/downloads

Dans un terminal il faut ensuite installer angular avec nodejs :
sudo npm install -g @angular/cli

Puis dans le dossier de votre choix, il faut cloner le projet git sur votre machine en local. Ouvrez un terminal et entrez dans le dossier où se situera le projet puis entrez la commande suivante :
git clone https://github.com/Vinyard78/reactivation.git

entrez ensuite dans le dossier qui vient de se créer :
cd reactivation

puis entrez la commande suivante pour installer les dependances du projet:
sudo npm install

Executer ensuite la commande suivante pour corriger automatiquement les eventuelles erreurs entre les dependances:
sudo npm fix audit

meme si toutes les erreurs ne sont pas corrigées, vous pouvez maintenant tester le projet en local en lançant la commande suivante :
ng serve --open

Vous pouvez maintenant effectuer des modifications dans les fichiers du projet et les enregistrer, les modifs seront effectifs directement sur le site ouvert en localhost.

Pour compiler le projet il faut lancer la commande suivante:
ng build --prod

le projet va se compiler dans le dossier "dist" qui va se créer à la racine du projet.

Ouvrez ce dossier et ouvrez le fichier index.html et faites les modifications suivantes :
  il faut rajouter "/reactivation/" au debut de chaque source de fichier pour le fichier .css et pour les fichier .js

<link rel="stylesheet" href="/reactivation/styles.6249eba5d4078f23afd8.css">

<script src="/reactivation/runtime-es2015.858f8dd898b75fe86926.js" type="module"></script>
<script src="/reactivation/polyfills-es2015.bb4716a5358c9d54d80c.js" type="module"></script>
<script src="/reactivation/runtime-es5.741402d1d47331ce975c.js" nomodule></script>
<script src="/reactivation/polyfills-es5.0ba643b380ed275b79a3.js" nomodule></script>
<script src="/reactivation/main-es2015.b864c04197c0435a31a6.js" type="module">	
</script><script src="/reactivation/main-es5.df241bc999f334e3d03a.js" nomodule></script>


Il suffit ensuite avec filezilla par exemple de copier tout se qu'il y a dans le dossier "dist" à la racine du serveur et le projet sera en prod. (Attention à ne pas écraser sur le serveur le dossier "reactivation/api")


NB: Si on édite les fichiers du dossier "api" il faut bien faire attention à enregistrer les fichier avec un encodage "utf8".






# Reactivation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
