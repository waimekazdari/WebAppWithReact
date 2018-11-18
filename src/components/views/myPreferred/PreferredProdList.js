import React , {Component} from 'react'

class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
      preffProducts: this.props.products,
      prodToDelete : {}
    }
      }

  changePreffProd = (prod)=>{
    this.props.changePreferredProd(prod);
  }


  RemoveFunction = (event)=>{
    //var index = this.state.index;
    var index = event.target.id;
    //console.log(id);
    var preffProducts = this.state.preffProducts;
  /*  var prodToDelete = this.state.prodToDelete;
    console.log(prodToDelete);
    preffProducts.map((product) =>{
      //console.log(product);
      if(product.id == id){
        prodToDelete=product;*/
      //  console.log(prodToAdd);
        preffProducts.splice(index,1);
        this.setState(preffProducts);
    //  }
  //  });
    this.changePreffProd(preffProducts);
  }
  render() {
    var index = 0;
    let rows = [];
    this.props.products.map((product) =>{
      console.log(40);
      console.log(product);
      //for(let i = 0 ; i<product.length ; i++){
      rows.push(
      <div className="item" key={index}>
        <img src={require('../../../images/'+product.image+'.jpg')} alt="" width="202" height="173" /><br />
        <span>{product.price}</span><button   className="dislike" id = {index} onClick={this.RemoveFunction}>Remove</button>
      </div>

      );
      index++;
    //  }
    });

    return (

              <div id="items">
                {rows}
              </div>

    );
  }

}

export default ProductList;
