import styled from "styled-components";
import MapDetail from "../kakaomap/detail";
import HospitalDetailReview from "../components/hospital_detail_review";
import MainWrite from "../components/mainwrite_button";
import MapInform from "../components/map_information";

export default function MergeDetail(){

    return(
        <>
        {/*<MapDetail/>*/}
        <MapInform/>
        <MainWrite/>
        <HospitalDetailReview/>
        </>
    );
}