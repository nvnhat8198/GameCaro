// import React from "react";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBIcon,
//   MDBCardHeader,
//   MDBBtn
// } from "mdbreact";

// const Profile = () => {
//   return (
//     <MDBContainer>
//       <MDBRow>
//         <MDBCol md="6">
//           <MDBCard>
//             <MDBCardBody>
//               <MDBCardHeader className="form-header warm-flame-gradient rounded">
//                 <h3 className="my-3">
//                   <MDBIcon icon="user" /> Name:
//                 </h3>
//               </MDBCardHeader>
//               <div className="text-center mt-4">
//                 <MDBBtn color="deep-orange" className="mb-3" type="submit">
//                   Logout
//                 </MDBBtn>
//               </div>

//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default Profile;

import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Profile.css";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Profile</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormControl autoFocus disabled value="username" />
        </FormGroup>

        <Button block bsSize="large" type="submit">
          Logout
        </Button>
      </form>
      <div className="link">
        <a href="/">Doashboard</a>
      </div>
    </div>
  );
}
