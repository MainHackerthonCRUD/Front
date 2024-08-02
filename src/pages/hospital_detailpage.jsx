import styled from "styled-components";
import MapDetail from "../kakaomap/detail";
import HospitalDetailReview from "../components/hospital_detail_review";
import MainWrite from "../components/mainwrite_button";

export default function MergeDetail(){

    return(
        <>
        <MapDetail/>
        <MainWrite/>
        <HospitalDetailReview/>
        </>
    );
}