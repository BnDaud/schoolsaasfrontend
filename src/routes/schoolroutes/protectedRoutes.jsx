import NotAllowed from "../../pages/Restricted/restricted";
import { useContext } from "react";
import { globalContext } from "../../context/globalcontext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { role } = useContext(globalContext);
  if (role !== allowedRole) return <NotAllowed />;
  return children;
}
