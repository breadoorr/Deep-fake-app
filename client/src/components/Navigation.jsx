import {useNavigate} from "react-router-dom";

export const Navigation = () => {
    const navigate = useNavigate();

    // return (
        // <nav
        //         className="d-flex justify-content-center align-items-center relative top-10"
        //     style={{
        //         background: '#333',
        //         padding: '1rem 0',
        //         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        //     }}
        // >
        //     <button
        //         className="nav-button"
        //         style={{
        //             padding: '0.5rem 1.5rem',
        //             fontSize: '1rem',
        //             border: 'none',
        //             borderRadius: '4px',
        //             // backgroundColor: '#2196F3',
        //             color: '#fff',
        //             cursor: 'pointer',
        //         }}
        //         onClick={() => navigate('/learning')}
        //     >
        //         Learning Mode
        //     </button>
        //     <button
        //         className="nav-button"
        //         style={{
        //             marginRight: '1rem',
        //             padding: '0.5rem 1.5rem',
        //             fontSize: '1rem',
        //             border: 'none',
        //             borderRadius: '4px',
        //             // backgroundColor: '#4CAF50',
        //             color: '#fff',
        //             cursor: 'pointer',
        //         }}
        //         onClick={() => navigate('/menu')}
        //     >
        //         Game Mode
        //     </button>
        //
        // </nav>
    // )
}