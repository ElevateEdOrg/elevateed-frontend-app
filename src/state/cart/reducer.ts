import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseType } from "../courses/reducer";

interface CartState {
  courses: CourseType[];
}

const initialState: CartState = {
  courses: [],
};

// Function to save cart state to AsyncStorage
const saveCartToStorage = async (courses: CourseType[]) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(courses));
  } catch (error) {
    console.log("Error saving cart to storage:", error);
  }
};

// Function to load cart from AsyncStorage
const loadCartFromStorage = async () => {
  try {
    const storedCart = await AsyncStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.log("Error loading cart from storage:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CourseType>) => {
      const courseExists = state.courses.some(
        (course) => course.id === action.payload.id
      );
      if (!courseExists) {
        state.courses.push(action.payload);
        saveCartToStorage(state.courses); // Save updated cart to AsyncStorage
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
      saveCartToStorage(state.courses); // Save updated cart to AsyncStorage
    },
    clearCart: (state) => {
      state.courses = [];
      saveCartToStorage(state.courses); // Clear cart in AsyncStorage
    },
    setCart: (state, action: PayloadAction<CourseType[]>) => {
      state.courses = action.payload;
    },
  },
});

// Async function to initialize cart from storage
export const initializeCart = () => async (dispatch: any) => {
  const savedCart = await loadCartFromStorage();
  dispatch(setCart(savedCart));
};

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
