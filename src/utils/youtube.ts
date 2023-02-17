import { createClient } from '@supabase/supabase-js';
import camelcaseKeys from 'camelcase-keys';
import GithubSlugger from 'github-slugger';

import { alphaSortByObjectField } from './sort';

export interface ChannelDB {
    title: string;
    has_notifications: boolean;
    channel_id: string;
    category: {
        title: string;
    }
}

export interface Channel {
    title: string;
    hasNotifications: boolean;
    channelId: string;
    category: {
        title: string;
    }
}

export interface CategoryChannels {
    category: string;
    categorySlug: string;
    channels: Channel[];
}

export async function fetchYouTubeSubscriptions(): Promise<Channel[]> {

    const supabase = createClient(
        import.meta.env.SUPABASE_URL,
        import.meta.env.SUPABASE_API_KEY_PUBLIC,
    );

    const { data, error } = await supabase
        .from('youtube_channels')
        .select(`
            title,
            has_notifications,
            channel_id,
            category:channel_categories (
                title
            )
        `)
        .eq('is_hidden', false)
        .not('category_id', 'is', 'null')
        .order('title', { ascending: true });

    if (error) {
        // https://github.com/supabase/supabase-js/issues/32
        console.error(error);
        throw new Error(error.message);
    }

    return camelcaseKeys(data as ChannelDB[]);

}

interface CategoryMap {
    [key: string]: Channel[];
}

export function groupAndSortSubscriptions(subscriptions: Channel[]) {

    const slugger = new GithubSlugger();

    const initialValue: CategoryMap = {};

    const groupedSubs = subscriptions.reduce((accum, channel: Channel) => {

        if (!accum[channel.category.title]) {
            accum[channel.category.title] = [];
        }

        accum[channel.category.title].push(channel);

        return accum;

    }, initialValue);

    const sortedGroups = Object.keys(groupedSubs)
        .sort()
        .map((category) => ({
            category,
            categorySlug: slugger.slug(category),
            channels: alphaSortByObjectField(groupedSubs[category], 'title'),
        }));

    return sortedGroups;

}
