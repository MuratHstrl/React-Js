import React from 'react';
import firebase from 'firebase'
export class Islemler extends React.Component{
constructor(props){
    super(props);
    this.state={
        data:' ',
        // Veritabanındaki bilgiler her zaman Dizi şeklinde gelir
        Datass:[]
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
// Veritabanındaki verilere ulaşmak için
   componentWillMount() {
    firebase.database().ref('Data').on('value', (Snap) => {
        let dizi = [];
        // içini gezer verileri okuyup diziye atar
        Snap.forEach((deger) => {
            var key = deger.key
            const {Dataname} = deger.val();
            dizi.push({ Dataname , key })
        })
        dizi.reverse();
        this.setState({ Datass: dizi })
    })
}
//--------------------------------------------------------------------
// Değerleri Listelemek İçin
    render(){
        const x = this.state.Datass.map((deger, i) => {
            return (
                <div >
                <p key={i} class="list-group-item" style={{borderRadius:'10px',backgroundColor:'#dcdde1', textAlign:"center"}}> <h4>{deger.Dataname} </h4> 
                <center>
                 <button class='ui red inverted button' onClick={() => {this.datadelete(deger.key)}}>Sil</button>
                 </center>            
                 <br/>        
                </p> 
                <br/>
                </div>                        
            )
        })
 //*************************************-
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
                    <div>
                        {x}                       
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
        )

    }
}