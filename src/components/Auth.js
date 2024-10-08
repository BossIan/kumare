import { authSubscribe } from "@junobuild/core";
export const AuthContext = createContext();
function Auth(){
    const [user, setUser] = useState(undefined);
  
    useEffect(() => {

      const sub = authSubscribe((user) => setUser(user));
  
     sub();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user }}>
        {user !== undefined && user !== null ? (
          <div>
  
            <Logout />
          </div>
        ) : (
          <Login />
        )}
      </AuthContext.Provider>
    );
  };

export default Auth;
  