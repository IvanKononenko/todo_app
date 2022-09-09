import React from 'react';
import MySelect from "./UI/select/MySelect";

const TasksFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                value={filter.query}
                onChange={event => setFilter({...filter, query: event.target.value})}
                style={{marginRight: '10px'}}
                placeholder="search for..."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort=>setFilter({...filter, sort: selectedSort})}
                defaultValue="sort by..."
                options={[
                    {value: "name", name: "sort by name"},
                    {value: "id", name: "sort by date"}
                ]}
                />
        </div>
    );
};

export default TasksFilter;
