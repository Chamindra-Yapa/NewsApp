import React, { Component } from 'react';
import { 
    loadNews,loadAds
} from './redux/actions/actions'


class NewsDashboard extends React.Component{
        state = { news: [],
            sideNews:[],
          };
       componentDidMount(){
          loadNews().then(data => {
          let newsDataNew= data.map((news)=>{
              return Object.assign({},news,{showMainDescription:false,fullView:false})
          });
            this.setState({news:newsDataNew,sideNews:newsDataNew});    
         
        });
    }
    loadNewsClicked=(newsId)=> {
         let newsNext=this.state.sideNews.map((newsData)=>{
            if (newsData.id===newsId){
                return Object.assign({},newsData,{fullView:true});
            }
            else{
                return Object.assign({},newsData,{fullView:false});
            }
        });
        // const sortedNews= newsNext.sort((a,b)=>{
        //     if (a.sortKey < b.sortKey)
        //         return -1;
        //     if (a.sortKey > b.sortKey)
        //         return 1;
        //     return 0;
        // });
        const filteredNews=newsNext.filter((newsData)=>{
            return newsData.fullView;
       });
       this.setState({news:filteredNews,readMore:false}); 
       
    }
     onMoreClick=(newsId)=>{
     }

    render(){
          return (
            <div className='ui grid'>
                <div className='row'>
                    <div className='column'>
                        <div className='ui horizontal list' >
                            <AdvertisementList 
                            loadAds={loadAds}
                            adType={'NORMAL'}
                            />
                        </div>
                    </div> 
                </div>    
                <div className='left floated column three wide'>
                    <div className='items' >
                        <NewsItemList
                        allNews={this.state.sideNews}
                        onloadNewsClicked={this.loadNewsClicked}
                        adType={'SQUARE'}/>
                    </div>   
                </div> 
                <div className='column ten wide centered'>
                    <LatestNewsInDetailList 
                    allNews={this.state.news}
                    onMoreClick={this.loadNewsClicked}
                    adType={'SQUAREBOTTOM MEDIUM'}/>
                </div>
                <div className='right floated column three wide'>
                    <div className='items' >
                        <NewsItemList
                        allNews={this.state.sideNews}
                        onloadNewsClicked={this.loadNewsClicked}
                        adType={'SQUARE'}
                        />
                    </div> 
                </div>      
              </div>
        );
    }
}

class Advertisement extends React.Component{
    bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
    }
    render()    {
        console.log(this.props.adType);
        console.log(this.props.adType.indexOf('SQUARE'));
        let imageFile;
         if (this.props.image) {
                var data = new Uint8Array(this.props.image.data);
                var base64 = this.bufferToBase64(data);
                
                imageFile= 'data:image/jpeg;base64,' + base64;
            }   
        if (this.props.adType==='NORMAL') {
            return(
                    <div className="item">
                            <div className='ui half banner test ad'>
                            <a href={this.props.url}  >
                                <img alt="" className="ui image"  src={(this.props.image) ?imageFile:''} /> </a>  
                        
                        </div>
                    </div>    
                    );
        }
         if (this.props.adType==='SQUAREBOTTOM') {
             return(
                    <div className="item">
                            <div className='ui squarebottom banner test ad'>
                            <a href={this.props.url}  >
                                <img alt="" className="ui image" src={(this.props.image) ?imageFile:''} /> </a>  
                        
                        </div>
                    </div>    
                    );
        }  

        if (this.props.adType==='SQUARE') {
            return(
                    <div className="item">
                            <div className='ui square banner test ad'>
                            <a href={this.props.url}  >
                                <img alt=""  className="ui image" src={(this.props.image) ?imageFile:''} /> </a>  
                        
                        </div>
                    </div>    
                    );
        }
         if (this.props.adType==='MEDIUM') {
            return(
                    <div className="item">
                            <div className='ui medium banner test ad'>
                            <a href={this.props.url}  >
                                <img alt="" className="ui image" src={(this.props.image) ?imageFile:''} /> </a>  
                        
                        </div>
                    </div>    
                    );
        }
       

    };

}

class AdvertisementList extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
                ads: [] 
            };
    }   
    componentDidMount() {
          this.props.loadAds().then(data => {
          this.setState({ads:data})
          }, 
          err=> {
            console.log(err); // Error: "It broke"
        });
    }
    render() {
         if (!this.state.ads) {
            return(<div>loading...</div>);
       }
       const AddComponents=this.state.ads.map((adv)=>{
           
          return  <Advertisement 
                    key={adv.id} 
                    title={adv.description}
                    image={adv.image}
                    url={adv.url}
                    adType={this.props.adType}
                    />
        });
        return(AddComponents);
   };
}

class NewsItemList extends React.Component{
    loadNewsClicked=(newsId)=>{
         this.props.onloadNewsClicked(newsId);
    }
    render() {
         if (!this.props.allNews) {
            return(<div>loading...</div>);
       }
       const newsItemComponents=this.props.allNews.map((newsItem)=>{
          return    <NewsItem 
                        key={newsItem.id} 
                        id={newsItem.id} 
                        title={newsItem.title}
                        image={newsItem.image}
                        onloadNewsClicked={this.loadNewsClicked}
                    />
         });
        return(<div> 
             {newsItemComponents}
             <Advertisement 
                key={1} 
                title={'ad'}
                adType={this.props.adType}
              />
          </div>
           );
     };
}

class NewsItem extends React.Component{
    bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}
loadNewsClicked=()=>{
    this.props.onloadNewsClicked(this.props.id);
}

        render() {
        let imageFile;
        if (this.props.image) {
            var data = new Uint8Array(this.props.image.data);
            var base64 = this.bufferToBase64(data);
            
            imageFile= 'data:image/jpeg;base64,' + base64;
         }     
        return(
                <div className='ui raised blue card'>
                        <div className='content'>
                            <img alt="" className="ui tiny rounded left floated image" src={(this.props.image) ?imageFile:''} />
                            <div className='top aligned content'>
                                <div className='ui tiny header' ><a onClick={this.loadNewsClicked}> {this.props.title} </a></div>
                        </div>        
                        </div>     
                </div>    
        );
    };
}

class LatestNewsInDetailList extends React.Component{
    onMoreClick=(newsId)=>{
        this.props.onMoreClick(newsId);
    }
   
    render(){
       
       if (!this.props.allNews) return(<div> loading...</div>);
       const newsComponents=this.props.allNews.map((newsItem)=>{
             return  <LatestNewsInDetail 
                    key ={newsItem.id}
                    id={newsItem.id} 
                    title={newsItem.title}
                    description={newsItem.description}
                    description2={newsItem.description2}
                    image={newsItem.image}
                    showMainDescription={newsItem.showMainDescription}
                    fullView={newsItem.fullView}
                    onMoreClick={this.onMoreClick}
                    adType={this.props.adType}
                   />                
        });
        return(newsComponents);
    };
}

class LatestNewsInDetail extends React.Component{
     

    bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}
showDescription=()=>{
    this.props.onMoreClick(this.props.id);
}
     render()    {
         let imageFile;
      
        
         if (this.props.image) {
            var data = new Uint8Array(this.props.image.data);
            var base64 = this.bufferToBase64(data);
            
            imageFile= 'data:image/jpeg;base64,' + base64;
         } 
         if (this.props.fullView) { 
             let newDescription = this.props.description.split('\n').map((item, i) => {
                    return <p key={i}> {item} </p>;
            });
             return(<div>
                 {/*<Advertisement 
                    key={1} 
                    title={'ad'}
                    adType={'MEDIUM'}
                 />*/}
                <div className='ui raised segment'>
                    <div className='content'>
                        <div className="ui huge header" > {this.props.title} </div>
                         <div><img alt="" className="ui fluid rounded image" src={(this.props.image) ?imageFile:''} /></div>
                         
                         <div className='ui big message'> {newDescription}
                  </div>
                 </div>
                 </div>
                 {/*<Advertisement 
                    key={2} 
                    title={'ad'}
                    adType={'SQUAREBOTTOM'}
                 />*/}
                 </div>    
                );
         }
         if (this.props.showMainDescription) {
              let newDescription = this.props.description.split('\n').map((item, i) => {
                    return <p key={i}>{item}</p>;
            }); 
          
         return(
                <div className='ui raised segment'>
                    <div className='content'>
                        <div className="ui huge header" > {this.props.title}</div>
                         <div><img alt="" className="ui fluid rounded image" src={(this.props.image) ?imageFile:''} /></div>
                         
                         <div className='ui big message'> {newDescription}
                                      <button className="ui blue button" onClick={this.showDescription} >Read Less...</button></div>
                       
                     </div>
                 </div>    
                );
         }
         else{
             let newDescription2 = this.props.description2.split('\n').map((item, i) => {
                    return <p key={i}>{item}</p>;
             });
           return(
                <div className='ui raised segment'>
                    <div className='content'>
                        <div className="ui huge header" > {this.props.title}</div>
                         <div><img alt="" className="ui fluid rounded image" src={(this.props.image) ?imageFile:''} /></div>
                         
                         <div className='ui big message'> {newDescription2}
                                      <button className="ui blue button" onClick={this.showDescription}>Read More...</button></div>
                         
                     </div>
                 </div>    
                );  
         }

    };
}

class App extends Component {
    render() {
        return ( 
              <NewsDashboard />  
             );
    }
}

export default App;
