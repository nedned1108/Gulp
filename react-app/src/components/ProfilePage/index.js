import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfileModal from "./editProfileModal"
import UpdateBusinessModal from '../UpdateBusinessModal';
import OpenModalButton from "../OpenModalButton";
import { thunkLoadAllBusinesses } from "../../store/business";
import { thunkRemoveBusiness } from '../../store/business';
import { useModal } from '../../context/Modal';
import BusinessCard from "../BusinessCard";
import { updateProfile, getProfile } from '../../store/profile';
import { getUser, updateUser } from '../../store/session';
import "./profilePage.css";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const business = useSelector(state => state.business.businesses);
    const userBusinesses = Object.values(business).filter(business => business.owner_id == sessionUser.id)

    useEffect(() => {
      dispatch(thunkLoadAllBusinesses())
    }, [dispatch])

    // useEffect(() => {
    //     // dispatch(getUser(+sessionUser.id))
    //     if (sessionUser){
    //     dispatch(updateUser(+sessionUser.id))
    //     .then(dispatch(getUser(+sessionUser.id)))
    //     }
    //     // dispatch(getProfile(+sessionUser.id))
    // }, [dispatch, sessionUser])

    const removeBusiness = (e) => {
      return dispatch(thunkRemoveBusiness(e))
    }
    return (
        <div>
          <div className='profileStats'>
            <ul className="profilepageul">
                <div>
                {sessionUser &&
                    <>
                    <div className='picandname'>
                    <div>
                        <img id='profilepic' src={sessionUser.img_url} alt="Profile picture could not be found"></img>
                    </div>
                    <div className='profilebox'>
                    <h1>
            {sessionUser.first_name} {sessionUser.last_name[0] + "."}
            </h1>

                    <div className='profileInfo'>
                    <h2>{sessionUser.first_name}'s Profile</h2>
                    <li>User: {sessionUser.username}</li>
                    <li>Email: {sessionUser.email}</li>
                    <li>Biography: {sessionUser.bio}</li>
                    <OpenModalButton
                    className= "updateProfileButton"
                    buttonText="Update Your Profile"
                    // onItemClick={closeMenu}
                    modalComponent={<UpdateBusinessModal />}
                    />
                    </div>
                    </div>
                    </div>
                    </>
                    }
                </div>
            </ul>
            </div>
            <div>
              <h3>User's businesses</h3>
              <div>
                {userBusinesses &&
                userBusinesses.map(business =>
                  <div>
                    <OpenModalButton
                      buttonText="Update Business"
                      modalComponent={<UpdateBusinessModal business={business} key={business.id}/>}
                    />
                    <button onClick={() => removeBusiness(business.id)}>Delete business</button>
                  <BusinessCard business={business} key={business.id} />
                </div>)
                }
              </div>
            </div>
        </div>
    )
}

