import { ArticleCountSettings, Edition } from '@sdc-libs/types';

// Filters are objects containing a `match` function. The `match`
// function takes some value of type `T` and returns a `boolean`.
// The idea is that `Filter`s are used to filter a list of `T`s.
// The fact that `T` is completely generic means that filters
// need to be constructed with some way to map from the actual
// provided type to the data needed to filter on. We do this with
// an `extract` function. Let's look at an example:
//
// Consider we want an `isRed` filter. We might go about defining a
// constructor like so:
//
// const isRed = <T>(
//   extract: (t: T) => string
// ): Filter<T> => ({
//   match: (test) => extract(test) === "red",
// });
//
// We can use this filter on lots of different data types by just providing
// different extract methods i.e:
//
// isRed<{ colour: string }>((t) => t.colour);
//
// or maybe
//
// isRed<{ lots: { of: { nesting: { colour: string }}}}>((t) => t.lots.of.nesting.colour);
//
// or simply just
//
// isRed<string>((t) => t);
//
// Additionally, we often want the filter to be customised based on the
// user's request i.e we're more likely to want an `isMatchingColour` filter
// which checks the colour in the `T` matches the one provided by the user
// than an `isRed` filter. We can extend our filter constructor to also capture
// a value that we want to match i.e:
//
// const isMatchingColour = <T>(
//   colour: string,
//   extract: (t: T) => string
// ): Filter<T> => ({
//   match: (test) => extract(test) === colour,
// });
//
// which we would then use like so:
//
// const filter = isMatchingColour<{ colour: string }>(userColour, (t) => t.colour);
//
// It's the capturing of specific user data and an extract function that allows us
// to have this completely generic interface to our `match` function which makes
// it reusable.

export interface Filter<T> {
  match: (test: T) => boolean;
}

export const isOn = <T>(extract: (t: T) => boolean): Filter<T> => ({
  match: (test) => extract(test),
});

export const isCorrectEdition = <T>(
  edition: Edition,
  extract: (t: T) => Edition
): Filter<T> => ({
  match: (test) => extract(test) === edition,
});

export const isWithinArticleCountSettings = <T>(
  articleCount: number,
  extract: (t: T) => ArticleCountSettings
): Filter<T> => ({
  match: (test) => {
    const { min, max } = extract(test);

    if (max) {
      return min <= articleCount && articleCount <= max;
    }
    return min <= articleCount;
  },
});
