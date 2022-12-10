import { configureStore, createSlice, current } from '@reduxjs/toolkit'
import user from './user';

//Redux 사용 이유
// 1) 컴포넌트간 state 공유가 편리하다

let product = createSlice({
    name : 'product',
    initialState :
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changePrdc(data, action){
          //내가 만든 상품 추가 기능
          // data.map((val, i)=>{
          //   if(val.id === action.payload){
          //    val.count++;
          //   }
          // })

          let DataIndex = data.findIndex((e)=>{return e.id === action.payload});
          data[DataIndex].count++
        },
        addPrdc(props, action){

          let dataEx = true;
          for(let i=0; i < props.length; i++){
            if(props[i].id === action.payload.id){
              dataEx = false;
              break;
            }
          }
          
          if(dataEx === true){
            props.push(action.payload);
          }
          if(dataEx === false){
            alert("해당 상품이 담겨져있습니다.");
          }
          
        }
    }
});
export let {changePrdc, addPrdc} = product.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    product : product.reducer
  }
}) 