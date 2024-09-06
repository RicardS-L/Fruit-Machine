//Ricard Solanas

window.onload=inici;

let credit = numAleatori(6,10);
let pngs = ["chupachups.png","fotografia.png","gorra.png","llavero.png","maquineta.png","moneda.png","tenedor_lapiz.png"];
let potTirarTres = false;
let potTirarPrincipal = true;
let imgPerComparar=[];
let premi = false;
let mp3;
let premiGuanyatAleatori;

      function inici(){
            posarDinero();
            botonsVolverTirar();
            document.querySelector("#lanzar").addEventListener("click",tirarTots);
            mp3 = document.querySelector("#audio");
      }

      //funcio per calcular un nombre aleatori, mínim 10, máxim 15
      function numAleatori(max,min){
            let dinersAleatori = Math.floor(Math.random()*max+min);
            return dinersAleatori;
      }

      function posarDinero(){
            //escriure a caixa dinero el nombre random concatenant el codi HTML del signe d'€ que esborraba l'innerHTML
            document.querySelector("#dinero").innerHTML=`${credit}<span class="euros">€</span>`;
            //esborrar monedes per poder actualitzar-les
            document.querySelector("#monedas").innerHTML=`<div></div>`;
            //posar monedes a id monedas en funció del nombre random
            for (let i=0; i<credit;i++){
                  document.querySelector("#monedas").insertAdjacentHTML("beforeend",`<img src="img/moneda.png">`);
            }
      }

      function botonsVolverTirar(){
            for (let i=0;i<3;i++){
                  document.querySelectorAll(".boton")[i].addEventListener("click",tirarUn);
            }
      }

      function tirarUn(){
            if (potTirarTres){
                  mp3.src="audios/otra.wav";
                  mp3.play();
                  let fills = this.parentNode.children;
                  //comparem els fills per saber a quin botó li hem donat
                  for (let i=0;i<fills.length;i++){
                        if (fills[i]===this){
                              generarIMGRandom(i);
                              credit--;
                              posarDinero();
                              compararIMGS();
                        }
                  }
                  gameOver();
            }else if (potTirarTres==false && credit == 0){
                  missatge("No tens més crèdit, has perdut.");
                  mp3.src="audios/final.mp3";
                  mp3.play();
            }
      }

      function tirarTots(){
           if (potTirarPrincipal){
            mp3.src="audios/lanzar.mp3";
            mp3.play();
            for (let i=0;i<3;i++){
                  generarIMGRandom(i);
            }
            credit--;
            posarDinero();
            potTirarTres=true;
            compararIMGS();
            gameOver();
           }else if (potTirarPrincipal==false){
            missatge("No tens més crèdit, has perdut.");
            mp3.src="audios/final.mp3";
            mp3.play();
           }
      }

      function generarIMGRandom(i){
            document.querySelectorAll(".ventana img")[i].src=`img/${pngs[numAleatori(pngs.length,0)]}`;
      }

      function gameOver(){
            if (credit < 1) {
                  potTirarPrincipal = false;
                  potTirarTres = false;
            }
      }

      //funció per mostrar el div velo i escriure el missatge donat
      function missatge(text){
            document.querySelector("#velo").style.display="flex";
            document.querySelector("#mensaje").innerHTML=text;
            document.querySelector("#cruz").addEventListener("click",amagarMissatge);
      }

      function amagarMissatge(){
            document.querySelector("#velo").style.display="none";
            if (premi){
                  credit=credit+premiGuanyatAleatori;
                  posarDinero();
                  premi=false;
                  potTirarTres=false;
            }
      }

      function compararIMGS(){
            //omplir nou array amb els noms de les imatges en pantalla
            for (let i=0;i<3;i++){
                  imgPerComparar[i]=document.querySelectorAll(".ventana img")[i].getAttribute('src');
            }
            //verificar que les 3 imatges, siguin la mateixa
            if (imgPerComparar[0]==imgPerComparar[1]&&imgPerComparar[0]==imgPerComparar[2]){
                  premiGuanyatAleatori=numAleatori(4,2);
                  missatge(`Premi! has guanyat ${premiGuanyatAleatori} monedes!<br>`+ monedesPremi());
                  premi=true;
                  mp3.src="audios/ganar.mp3";
                  mp3.play();
            }
      }

      function monedesPremi(){
            let missatgeRetorn="";
            for(let i=0;i<premiGuanyatAleatori;i++){
                  missatgeRetorn+=`<img src="img/moneda.png" height="40px">`;
            }
            return missatgeRetorn;
      }