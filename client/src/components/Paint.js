import React, { useEffect, useState } from 'react'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { getPaint } from '../services/frontendRoutes'





export default function Paint() {


    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);

    // useEffect(async () => {
    //     try {
    //         const { data } = await getPaint();
    //         setGroups({ task: data });
    //         console.log(groups);
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }, [])

    async function fetchData() {
        try {
            const { data } = await getPaint();
            setGroups(data.data.groups);
            let item = data.data.items;
            let itemss = item.map(i => {
                i.start_time = moment(i.start_time, 'YYYY-MM-DDTHH:mm:ss');
                i.end_time = moment(i.end_time, 'YYYY-MM-DDTHH:mm:ss');
                return i;
            })
            setItems(itemss)


            //console.log('data', data)
            // console.log('response', data.data);
            // console.log('Groups', data.data.groups);
            // console.log('Items', data.data.items)
            //console.log('Groupwww', groups);
            //console.log('Itemsss', item);
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchData();
    }, [])


    //const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
    //console.log(typeof (group))

    // const items = [
    //     {
    //         id: 1,
    //         group: 1,
    //         title: 'item 1',
    //         start_time: moment(),
    //         end_time: moment().add(1, 'hour')
    //     },
    //     {
    //         id: 2,
    //         group: 2,
    //         title: 'item 2',
    //         start_time: moment().add(-0.5, 'hour'),
    //         end_time: moment().add(0.5, 'hour')
    //     },
    //     {
    //         id: 3,
    //         group: 1,
    //         title: 'item 3',
    //         start_time: moment().add(2, 'hour'),
    //         end_time: moment().add(3, 'hour')
    //     }
    // ]


    return (
        <div>
            Paint
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={moment().startOf('year')}
                defaultTimeEnd={moment().endOf('year')}
            />
        </div>
    )
}
