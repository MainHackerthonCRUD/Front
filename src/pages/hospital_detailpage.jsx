import styled from "styled-components";
import MapDetail from "../kakaomap/detail";
import HospitalDetailReview from "../components/hospital_detail_review";
import WritePost from "../components/button_write_review";
import MapInform from "../components/map_information";
import { useState, useEffect } from "react";

export default function MergeDetail(){

    const [hospitalId, setHospitalId] = useState(null);

    useEffect(() => {
        console.log("hospitalId changed:", hospitalId);
      }, [hospitalId]);

    return(
        <>
        {/*<MapDetail/>*/}
        <MapInform setHospitalId={setHospitalId}/>
        {hospitalId ? 
            (
                <>
                <WritePost hospitalId={hospitalId} />
                <HospitalDetailReview hospitalId={hospitalId} />
                </> 
            ) 
            : 
            (
                <p>로딩 중...</p>
            )
        }
        </>
    );
}