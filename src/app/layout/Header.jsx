import { Box } from "@mui/system";

const Header = () => {
    return ( 
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#ff6e14",
        }}>
            <h1 style={{color: "#FFF"}}>Le Bon Clone</h1>
            <p style={{color: "#FFF"}}>Le meilleur clone du bon coin 😅</p>
        </Box>
     );
}
 
export default Header;