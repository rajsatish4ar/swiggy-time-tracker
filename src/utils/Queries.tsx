import {gql} from '@apollo/client';
const TASK_RESPONSE_FIELDS = `
id
title
end_time
start_time
tags{
      id,
      name
    }
  
`;
export const GET_TASKS = gql`
  query {
    tasks {
      ${TASK_RESPONSE_FIELDS}
    }
  }
`;

export const ADD_TASK = gql`
  mutation addOneTask($title: String!, $data:[task_tag_insert_input!]!, $start:timestamptz!, $end:timestamptz!) {
    insert_tasks_one(object: {
      title: $title,  
      start_time: $start,
      end_time: $end,
      task_tags:{
      data:$data
    }}){
      ${TASK_RESPONSE_FIELDS}
    } 
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($title: String!, $id: Int!, $start:timestamptz!, $end:timestamptz!) {
    update_tasks(_set: {
      title: $title,
      start_time: $start,
      end_time: $end,
    }, where: {id: {_eq: $id}}) {
      returning {
       ${TASK_RESPONSE_FIELDS}
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation updateTask($id: Int!) {
    delete_tasks(where: {id: {_eq: $id}}) {
      returning {
       ${TASK_RESPONSE_FIELDS}
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query {
    tags {
      id
      name
    }
  }
`;

export const INSERT_TAG = gql`
  mutation insertTag($name: String!) {
    insert_tags_one(object: {name: $name}) {
      id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: Int!) {
    delete_tags(where: {id: {_eq: $id}}) {
      returning {
        id
        name
      }
    }
  }
`;
