const extract = async () => {
    const urls = [
        "https://i.ibb.co/xKjSpQJX/Gemini-Generated-Image-xvhv2jxvhv2jxvhv-ezremove.png"
    ];
    for (const url of urls) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            console.log(url, res.headers.get('content-length'), res.status);
        } catch (e) {
            console.log(url, e.message);
        }
    }
}
extract();
