# Analytics and monitoring

## Purpose

The dashboard answers three questions: are people reaching the site, are they finding a useful starting point, and are they trying the graphs? An interaction is evidence of use, not evidence that somebody understood probability or chose the correct model.

Use the Probability Distribution Visualizer property **544288691**, web stream **15205184510**, measurement ID **G-NEDZM016GM**. The algorithm visualizer property is a different site.

## Events

| Event | Meaning | Interpretation |
| --- | --- | --- |
| `page_view` | Charts, guide list, or a specific guide detail was opened | One view per content navigation. Category filters, numeric settings, language and theme do not add views. |
| `guide_view` | The guide list was opened | Includes direct entrances and returning to the list. |
| `guide_category_select` | A different category or All was selected | Use `guide_category` to see which entrances are used. |
| `guide_case_view` | A case detail was opened | Includes direct links; do not assume every reader passed through the list. |
| `guide_alternative_select` | Another candidate was selected from a detail | `distribution` is the destination; `from_distribution` is the source. |
| `guide_chart_open` | The detail-to-chart link was clicked | Intent to open a chart, not proof that it loaded or was used. |
| `distribution_explore` | A numeric setting changed, simulation was enabled, or samples were redrawn | Once per distribution per document. Compare **users** or session key-event rate, not raw counts, to visits. |
| `param_change` | A parameter stopped changing for one second | Per distribution and control. Same-value commits do not count. No parameter values are sent. |
| `histogram_on` | Sample simulation was enabled | Repeated toggles count as actions; use users for feature reach. |
| `sample_size_change` | Sample size stopped changing for one second | No sample-size values are sent. |
| `sample_resample` | New samples were requested | Repeat actions are intentional. |
| `feedback_rating` | A visitor selected up or down | Ratings reflect respondents, not all visitors. Use event counts to calculate up / (up + down). |
| `feedback_form_open` | The external feedback form was opened | Does not measure form submission. |
| `use_cases_toggle`, `settings_reset`, `help_open`, `lang_switch`, `theme_switch` | Supporting actions | Diagnostic signals, not key outcomes. |

Every event includes `page_type` (`charts`, `guide_list`, `guide_detail`) and `measurement_version=2`. `distribution` uses registry IDs. `guide_category` is the selected filter, including `all`; it is not inferred from the distribution. No free text, numerical settings, sample arrays, or random seeds are included in custom event parameters.

## Counting rules

- Automatic page views in the tag configuration are disabled. The app sends explicit page views with normalized page locations and stable titles. The stream's enhanced-measurement **page changes based on browser history events must remain off**; `send_page_view: false` alone does not disable those history events.
- Repeated React effects do not add page views. Returning from one content page to another does count. Browser reloads are new document views.
- Pending input events retain the originating page context and flush when the document becomes hidden or exits. This reduces quick-exit losses; blocked analytics and abrupt process termination can still lose events.
- `distribution_explore` is emitted once per distribution per document, not once per user. Configure it as a key event and use the session key-event rate to answer how many visits included an actual interaction.
- Use a closed, ordered funnel (guide list → detail → chart link → exploration) for the guided path. Ratios of independent event totals are **not** funnel conversion rates. Direct links to details or charts bypass this path by design.

## Reading the dashboard

The saved [GA4 dashboard](https://analytics.google.com/analytics/web/?authuser=0#/a154552231p544288691/assetlibrary/builder/edit/15812634856) is named **確率分布｜訪問・ケース選択・グラフ操作**. Its collection, **確率分布の利用状況 → モニタリング**, is saved but not published to the report navigation.

The nine cards cover users, sessions, graph users, the ordered guide funnel, distributions used, daily users, devices, ratings, and session sources. The graph-user and distribution cards filter event names containing `distribution_explore`; the rating card filters names containing `feedback_rating`. These filters allow setup before GA has received the new events. Do not introduce event names containing these names; switch to exact matches once they are available in the filter picker.

Five event-scoped dimensions are registered: ページ種別 (`page_type`), 確率分布 (`distribution`), ケース分類 (`guide_category`), 役立ち評価 (`rating`), and 計測バージョン (`measurement_version`). `distribution_explore` is a key event counted once per session, with no monetary value.

Start with the last 28 complete days compared with the previous 28 days. Use the same date range for all reports.

1. **Reach:** users, sessions, sources and devices. A traffic drop with an unchanged interaction rate suggests an acquisition issue.
2. **Use:** users who trigger `distribution_explore`. For a visit-based rate, inspect its session key-event rate in a detailed report. Stable traffic with fewer interactions suggests a usability or content issue.
3. **Guide:** case-detail readers and chart-link users. Inspect the ordered funnel before claiming where people drop off.
4. **Topics and feedback:** distributions used and up/down responses. Category choices can be investigated using `guide_category_select` and the registered dimension. Compare mobile with desktop before changing the content.

New events start only after the PR is merged and deployed. Registered dimensions are not retroactive and may take 24–48 hours to become reportable. Empty new charts initially mean no processed data, not necessarily a malfunction. Keep pre-change and post-change periods separate because the definition of a page view and event context changed.

Localhost never loads the Google tag. Unit tests replace `gtag` with a spy. Do not send synthetic production events to populate charts.

## References

- [Google: manually measure page views](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google: custom dimensions and processing delay](https://support.google.com/analytics/answer/14240153?hl=en)
