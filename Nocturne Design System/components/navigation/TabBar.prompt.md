Bottom navigation for the mobile app. Frosted, active item tints mint.

```jsx
const [tab, setTab] = React.useState("home");
<TabBar active={tab} onChange={setTab} items={[
  { key: "home", icon: "house", label: "Trang chủ" },
  { key: "search", icon: "search", label: "Tìm kiếm" },
  { key: "library", icon: "library", label: "Thư viện" },
]} />
```

Defaults to a Home / Search / Library set if `items` is omitted.
