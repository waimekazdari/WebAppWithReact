import React , {Component} from 'react'

class ProductList extends Component {


  render() {

    let rows = [];
    this.props.products.map((product) =>{
      rows.push(
      //  <ProductRow product={product} key={product.id} > </ProductRow>
      <div class="item">
        <img src={require('../../images/'+product.image+'.jpg')} alt="" width="202" height="173" /><br />
        <span>{product.price}</span><button class="like">like</button> <button class="dislike">dislike</button>
      </div>
      );

    });

    return (

              <div id="items">
                {rows}
              </div>

    );
  }

}

export default ProductList;
