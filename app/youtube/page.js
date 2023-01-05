import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { getYouTubeSubscriptions, getYouTubeLastUpdated } from 'lib/youtube.js';

import PageTitle from 'components/PageTitle';
import Link from 'components/Link';

export default async function YouTube() {
    const subscriptions = await getYouTubeSubscriptions();
    const lastUpdated = getYouTubeLastUpdated();

    return (
        <>
            <PageTitle
                title="YouTube Subscriptions"
                lastUpdated={new Date(lastUpdated)}
            >
                <FontAwesomeIcon icon={faYoutube} /> YouTube Subscriptions
            </PageTitle>

            <p>
                I watch a lot of YouTube videos. After live sports, YouTube is
                where I consume most video content. Every so often, a friend or
                colleague will ask about the channels I watch, so this is my way
                of addressing these requests. The following list is not all of
                the channels I subscribe to, but these are the channels that I
                watch regularly. The channels with the{' '}
                <FontAwesomeIcon icon={faBell} title="bell icon" /> icon are
                channels that I receive notifications when new videos are
                posted.
            </p>

            <p className="text-muted">
                Categories and channels are listed in alphabetical order.
            </p>

            <div className="mt-3 row">
                {subscriptions.map(({ category, channels }) => {
                    return (
                        <div key={category} className="col-6 col-md-4 mb-4">
                            <h3 className="text-capitalize mb-3">{category}</h3>

                            <ul className="list-unstyled">
                                {channels.map(
                                    ({
                                        channel_name,
                                        channel_url,
                                        has_notifications,
                                    }) => {
                                        return (
                                            <li
                                                key={channel_name}
                                                className="mb-1"
                                            >
                                                <Link href={channel_url}>
                                                    {channel_name}
                                                </Link>

                                                {has_notifications === '1' && (
                                                    <FontAwesomeIcon
                                                        icon={faBell}
                                                        className="ms-1 text-warning opacity-75"
                                                        title="bell icon"
                                                    />
                                                )}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
