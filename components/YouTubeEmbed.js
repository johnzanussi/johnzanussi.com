const YouTubeEmbed = ({ id }) => {
    return (
        <div className="ratio ratio-16x9 mb-4">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YouTubeEmbed;
