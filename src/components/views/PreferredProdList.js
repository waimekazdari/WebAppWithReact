import React , {Component} from 'react'

class ProductList extends Component {


  render() {

    let rows = [];
    this.props.products.map((product) =>{
      for(let i = 0 ; i<product.products.length ; i++){
      rows.push(
      <div class="item">
        <img src={require('../../images/'+product.products[i].image+'.jpg')} alt="" width="202" height="173" /><br />
        <span>{product.products[i].price}</span><button class="like">like</button> <button class="dislike">dislike</button>
      </div>
      );
      }
    });

    return (

              <div id="items">
                {rows}
              </div>

    );
  }

}

export default ProductList;
