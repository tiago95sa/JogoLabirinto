

export default class StartMenu extends Phaser.Scene {
    constructor(key) {
      super(key);
    }
    
      create(){
        var texto = this.add.text(200,150,'LABIRINTO', {font:'35px emulogic',fill:'#fff'});
        var texto = this.add.text(20,430,'Disciplina : Jogos de Computador', {font:'8px emulogic',fill:'#fff'});
        var texto = this.add.text(20,440,'Docente : Alessandro Moreira', {font:'8px emulogic',fill:'#fff'});
        var texto = this.add.text(20,450,'Aluno : Tiago Sa  33755', {font:'8px emulogic',fill:'#fff'});



        var start = this.add.text(250,250,'Start Game', {font:'20px emulogic',fill:'#fff'});
      
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceBar.on('down',function(event){
            
            this.scene.stop();
            this.scene.start('FinalScene');
        }.bind(this)); 
    
        

       }

}