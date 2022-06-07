import { Loader } from "components/loader";
import { CreativeList } from "templates/Creative-list";
import React from "react";
import { useQuery } from "react-query";
import { getCreatives } from "service/api";

export const CreativesPage = (): JSX.Element => {
    const { data, isLoading, error } = useQuery('creatives', getCreatives)  
    if (data) console.log(data)
    if (isLoading) return <Loader />
    if (error) return <p>'An error has occurred'</p>

    return (
        <CreativeList creatives={data} />
    )
}