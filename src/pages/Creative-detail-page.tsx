import { Loader } from "components/loader";
import { Detail } from "templates/Detail";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getCreativeDetail } from "service/api";

export const CreativeDetailPage = (): JSX.Element => {
    const { id } = useParams()
    const { data, isLoading, error } = useQuery('creativeDetail', () => getCreativeDetail(id))  
    if (data) console.log(data)
  
    if (isLoading) return <Loader />
    if (error) return <p>'An error has occurred'</p>
  
    return (
      <Detail data={data} />
    )
  }