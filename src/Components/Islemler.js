import React from 'react';
import firebase from 'firebase'

// Arama Yeri için
function Arama(term) {
    String.prototype.turkishToLower = function () {
        var string = this;
        var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) { return letters[letter]; })
        return string.toLowerCase();
    }
    return function (x) {
        return x.Dataname.turkishToLower().includes(term.turkishToLower()) || !term;
    }
}
export class Islemler extends React.Component{
constructor(props){
    super(props);
    this.state={
        data:' ',
        // Veritabanındaki bilgiler her zaman Dizi şeklinde gelir
        Datass:[],
        Gdata:' ',
        AramaKelimesi: ''
    }
    this.dara=this.dara.bind(this);
    this.datadelete = this.datadelete.bind(this);
}

    

  /*  Dara(){
        const inp = document.getElementById('Datainput');
        const val = inp.value;
        console.log(val);
    }
    */

    // Veriyi state atabilmek için
   dara(e){
       this.setState({data:e.target.value})
   }
   datadelete(e){
    firebase.database().ref('Data/'+e).remove().then(()=>{ alert('Başarıyla Silindi')})
    .catch(()=>{alert(console.error('Hata : Kullanıcı Silinemedi')
    )})
}
   // Veritabanına Eklemek İçin
   Datadd=()=>{
       firebase.database().ref('Data').push({
           Dataname :this.state.data
       })
       .then(()=>{
        alert('Başarıyla Eklendi')
       this.setState({data:' '})       
    })
        .catch((error)=>{alert(console.error('Hata Kullanıcı Eklenemedi')
        )});                                     
   }
   DataUpdate=(e)=>{         
            firebase.database().ref('Data/' + e).update({ Dataname: this.state.Gdata }).then(()=>{
                alert('Başarılı')
                this.setState({Gdata:' '})
            }).catch(()=>{
                alert('Başarısız')
            })
        
   }

// Veritabanındaki verilere ulaşmak için
   componentWillMount(){
    firebase.database().ref('Data').on('value', (Snap) => {
        let dizi = [];
        // içini gezer verileri okuyup diziye atar
        Snap.forEach((deger) => {
            var key = deger.key
            const {Dataname} = deger.val();
            dizi.push({ Dataname , key})
        })
        dizi.reverse();
        this.setState({ Datass: dizi })
    })
}
//--------------------------------------------------------------------
GDara=(e)=>{
this.setState({Gdata:e.target.value})
}
// Değerleri Listelemek İçin
    render(){
        const x = this.state.Datass.map((deger, i) => {
            return (
                <div >
                <p key={i} class="list-group-item" style={{borderRadius:'10px',backgroundColor:'#dcdde1', textAlign:"center"}}> <h4>{deger.Dataname} </h4> 
                <div class='ui focus input'>
                <input type='text' placeholder='GData' id='GDatainput' onChange={this.GDara} value={this.state.Gdata}/>
                <br/>
                </div>
                
                <center>
                 <button class='ui red inverted button' onClick={() => {this.datadelete(deger.key)}}>Sil</button>
                 <button class="ui yellow button" onClick={()=>{this.DataUpdate(deger.key)}}>Güncelle</button>
                 </center>            
                 <br/>        
                </p> 
                <br/>
                </div>                        
            )
        })
 //*************************************-

 // Arama yapmak için
 const Veriler = this.state.Datass.filter(Arama(this.state.AramaKelimesi)).map((deger, i) => {
     return(
        <div >
        <p key={i} class="list-group-item" style={{borderRadius:'10px',backgroundColor:'#dcdde1', textAlign:"center"}}> <h4>{deger.Dataname} </h4> 
        <div class='ui focus input'>
        <input type='text' placeholder='GData' id='GDatainput' onChange={this.GDara} value={this.state.Gdata}/>
        <br/>
        </div>
        
        <center>
         <button class='ui red inverted button' onClick={() => {this.datadelete(deger.key)}}>Sil</button>
         <button class="ui yellow button" onClick={()=>{this.DataUpdate(deger.key)}}>Güncelle</button>
         </center>            
         <br/>        
        </p> 
        <br/>
        </div>   
     )
 })
 //------------------------------------------------------
        return(
        <div style={{width:'25%'}}>
                    <div class='ui card'>
                    <div class='content'>
                    <div class='header' style={{textAlign:"center"}}>Veri Girişi</div> 
                    </div>
                    <div class='content'>
                    <div class='description'>
                    <center>
                    <div class='ui focus input' style={{width:'90%'}} >
                    <input type='text' placeholder='Data' id='Datainput' onChange={this.dara} value={this.state.data}/>                
                    </div>
                    <br/>
                    </center>
                    <center>
                        <br/>
                    <button class='ui green inverted button' type="button" onClick={this.Datadd}>
                   Kaydet
                    </button>                    
                    </center>
                    <br/>
                    <hr/>
                    <h3 style={{textAlign:"center"}}>Veri İşlemleri </h3>    
                    <hr/>    
                    <center> 
                   <div class="ui icon input">                   
                   <input type="text" placeholder="Ara" id='DataSearch' onChange={(e) => { this.setState({ AramaKelimesi: e.target.value }) }} value={this.state.AramaKelimesi}/>
                    <i class="inverted circular search link icon"></i>                                                                   
                 </div>
                 </center> 
                    <hr/>
                    <div style={{height: '450px', overflow: 'scroll', width: '100%'}}>                  
                        {Veriler}                       
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
        )

    }
}