import { createClient } from '@supabase/supabase-js';
import camelcaseKeys from 'camelcase-keys';
import GithubSlugger from 'github-slugger';

import { alphaSortByObjectField } from './sort';

export async function fetchYouTubeSubscriptions() {

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
        throw new Error(error.message, error);
    }

    return data;

}

export function groupAndSortSubscriptions(subscriptions) {

    const slugger = new GithubSlugger();

    const groupedSubs = camelcaseKeys(subscriptions).reduce((accum, channel) => {

        if (!accum[channel.category.title]) {
            accum[channel.category.title] = [];
        }

        accum[channel.category.title].push(channel);

        return accum;

    }, {});

    const sortedGroups = Object.keys(groupedSubs)
        .sort()
        .map((category) => ({
            category,
            categorySlug: slugger.slug(category),
            channels: alphaSortByObjectField(groupedSubs[category], 'title'),
        }));

    return sortedGroups;

}
