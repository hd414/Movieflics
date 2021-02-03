import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../context/firebase';

export const UseContent = (target) => {

    const [content, setContent] = useState();
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        firebase.firestore()
            .collection(target)
            .get()
            .then((snapshot) => {
                const allcontent = snapshot.docs.map((contenObj) => ({
                    ...contenObj.data(),
                    docId: contenObj.id,
                }));
                setContent(allcontent);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    return {
        [target]: content
    }
}
