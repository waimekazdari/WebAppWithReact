import React , {Component} from 'react'

class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
      preffProducts: null,
      userProductsId: null,
      prodToDelete : {}
    }
      }

  componentWillMount(){
      this.setState({
        preffProducts : this.props.products,
        userProductsId : this.props.userProductsId
      })

  }

// updating the preferred products list of the user after removing an item
  changePreffProd = (prodsId)=>{
    this.props.changePreferredProd(prodsId);
  }

// function for removing the product from the local storage list and updating the local state of the component
  RemoveFunction = (event)=>{

    var index = event.target.id;
    var userProductsId = this.state.userProductsId;
    var preffProducts = this.state.preffProducts;

        preffProducts.splice(index,1);
        userProductsId.splice(index,1);

        this.setState({
          userProductsId:userProductsId,
          preffProducts:preffProducts
        });
    this.changePreffProd(userProductsId);
  }


  render() {
    var index = 0;
    let rows = [];
    this.props.products.map((product) =>{
      console.log(40);
      console.log(product);
      rows.push(
      <div className="item" key={index}>
        <img src={require('../../../images/'+product.image+'.jpg')} alt="" width="202" height="173" /><br />
        <span>{product.price}</span><button   className="dislike" id = {index} onClick={this.RemoveFunction}>Remove</button>
      </div>

      );
      index++;
    });

    return (

              <div id="items">
                {rows}
              </div>

    );
  }

}

export default ProductList;
