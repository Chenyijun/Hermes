import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, getDocs, getUser, addDoc, query, orderBy, limit, collection, onSnapshot, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useFirestoreQuery } from '../hooks';
import { MessageList } from "semantic-ui-react";
import { auth } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import {ChatWrapper} from '../components/wrappers'
import { MessageWrapper, MessageTextWrapper } from '../components/wrappers'

const Message = ({ sender, text, sending }) => {

    return (
      <MessageWrapper>
          <p>{sender}</p>
          <MessageTextWrapper>{text}</MessageTextWrapper>
      </MessageWrapper>
    );
  };

export default Message