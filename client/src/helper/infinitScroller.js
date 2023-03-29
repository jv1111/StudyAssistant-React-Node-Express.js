const infinitScroller = async (event, data, setSkipCount) => {
    const { offsetHeight, scrollTop, scrollHeight } = event.target;
    if (offsetHeight + scrollTop >= scrollHeight) {
        setSkipCount(data?.length);//set the number of skip === to the lenght of the post (this will trigger the useSubjectsFetcher)
    }
}

export default infinitScroller;