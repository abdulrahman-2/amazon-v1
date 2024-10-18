import { removeFromCart } from "@/src/lib/store/features/CartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DeleteFromCart = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.title.substring(0, 12)}... removed from cart`);
  };
  return (
    <button
      className="text-red-500 text-xs font-semibold"
      onClick={() => handleDelete(product)}
    >
      Delete
    </button>
  );
};

export default DeleteFromCart;
