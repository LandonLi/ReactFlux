import {
  Avatar,
  Divider,
  Layout,
  Menu,
  Skeleton,
  Typography,
} from "@arco-design/web-react";
import {
  IconApps,
  IconBook,
  IconFile,
  IconList,
} from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../Store";

const MenuItem = Menu.Item;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar({ location }) {
  const navigate = useNavigate();
  const collapsed = useStore((state) => state.collapsed);
  const feeds = useStore((state) => state.feeds);
  const groups = useStore((state) => state.groups);
  const loading = useStore((state) => state.loading);
  const setCollapsed = useStore((state) => state.setCollapsed);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const path = location.pathname;

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Sider
      className="sidebar"
      trigger={null}
      width={240}
      collapsedWidth={0}
      breakpoint="lg"
      onCollapse={setCollapsed}
      collapsed={collapsed}
      collapsible
      style={{
        height: "100%",
        borderRight: collapsed ? "none" : "1px solid var(--color-border-2)",
        position: "fixed",
        top: 0,
        zIndex: "999",
      }}
    >
      <Menu
        selectedKeys={selectedKeys}
        style={{ width: "240px", height: "100%" }}
        onCollapseChange={() => setCollapsed(!collapsed)}
        collapse={collapsed}
        hasCollapseButton
        defaultOpenKeys={[
          path.substring(1).indexOf("/") === -1
            ? "/"
            : path.substring(0, path.substring(1).indexOf("/") + 1),
        ]}
        defaultSelectedKeys={[path]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 28px 0 10px",
            height: "44px",
            visibility: collapsed ? "hidden" : "visible",
          }}
        >
          <Avatar
            size={32}
            style={{
              marginRight: "10px",
              backgroundColor: "var(--color-text-1)",
            }}
          >
            <IconBook style={{ color: "var(--color-bg-1)" }} />
          </Avatar>
          <Typography.Title heading={6} style={{ margin: "0" }}>
            Reactflux
          </Typography.Title>
        </div>
        <Divider style={{ marginTop: 0, marginBottom: "4px" }} />
        <SubMenu
          key={`/`}
          title={
            <>
              <IconList />
              <span style={{ fontWeight: 500 }}>ARTICLES</span>
            </>
          }
        >
          <Skeleton loading={loading} animation text={{ rows: 3 }}>
            <Menu.Item key={`/`} onClick={() => navigate("/")}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>ALL</span>
                <Typography.Ellipsis
                  expandable={false}
                  showTooltip={true}
                  style={{
                    width: "50%",
                    color: "var(--color-text-4)",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {feeds.reduce((sum, feed) => sum + feed.unread, 0) === 0
                    ? ""
                    : feeds.reduce((sum, feed) => sum + feed.unread, 0)}
                </Typography.Ellipsis>
              </div>
            </Menu.Item>
          </Skeleton>
          <Skeleton loading={loading} text={{ rows: 0 }}>
            <Menu.Item key={`/starred`} onClick={() => navigate("/starred")}>
              <span>STARRED</span>
            </Menu.Item>
          </Skeleton>
          <Skeleton loading={loading} text={{ rows: 0 }}>
            <Menu.Item key={"/history"} onClick={() => navigate("/history")}>
              <span>HISTORY</span>
            </Menu.Item>
          </Skeleton>
        </SubMenu>
        {/*{collapsed ? null : <Divider style={{ margin: "4px" }} />}*/}
        <SubMenu
          key={`/group`}
          title={
            <>
              <IconApps />
              <span style={{ fontWeight: 500 }}>GROUPS</span>
            </>
          }
        >
          <Skeleton loading={loading} animation={true} text={{ rows: 6 }} />
          {loading
            ? null
            : groups.map((group) => (
                <MenuItem
                  key={`/group/${group.id}`}
                  onClick={() => navigate(`/group/${group.id}`)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Ellipsis
                      expandable={false}
                      showTooltip={true}
                      style={{ width: group.unread !== 0 ? "80%" : "100%" }}
                    >
                      {group.title.toUpperCase()}
                    </Typography.Ellipsis>
                    <Typography.Ellipsis
                      expandable={false}
                      showTooltip={true}
                      style={{
                        width: "20%",
                        color: "var(--color-text-4)",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {group.unread === 0 ? "" : group.unread}
                    </Typography.Ellipsis>
                  </div>
                </MenuItem>
              ))}
        </SubMenu>
        {/*{collapsed ? null : <Divider style={{ margin: "4px" }} />}*/}
        <SubMenu
          key={`/feed`}
          title={
            <>
              <IconFile />
              <span style={{ fontWeight: 500 }}>FEEDS</span>
            </>
          }
        >
          <Skeleton loading={loading} animation={true} text={{ rows: 6 }} />
          {!loading && feeds.length > 0
            ? feeds.map((feed) => (
                <MenuItem
                  key={`/feed/${feed.id}`}
                  onClick={() => navigate(`/feed/${feed.id}`)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Ellipsis
                      expandable={false}
                      showTooltip={true}
                      style={{
                        width: feed.unread !== 0 ? "80%" : "100%",
                      }}
                    >
                      {feed.title.toUpperCase()}{" "}
                    </Typography.Ellipsis>
                    <Typography.Ellipsis
                      expandable={false}
                      showTooltip={true}
                      style={{
                        width: "20%",
                        color: "var(--color-text-4)",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {feed.unread === 0 ? "" : feed.unread}
                    </Typography.Ellipsis>
                  </div>
                </MenuItem>
              ))
            : null}
        </SubMenu>
      </Menu>
    </Sider>
  );
}