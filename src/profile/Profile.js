import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";


const Profile = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header warm-flame-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="user" /> Name: 
                </h3>
              </MDBCardHeader>
              <div className="text-center mt-4">
                <MDBBtn color="deep-orange" className="mb-3" type="submit">
                  Logout
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profile;