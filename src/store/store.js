import { configureStore, createSlice } from '@reduxjs/toolkit'
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
          data.map((val, i)=>{
            if(val.id === action.payload){
             return val.count += 1;
            }
          })
        }
    }
});
export let {changePrdc} = product.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    product : product.reducer
  }
}) 