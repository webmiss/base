package util

import "strings"

/* 设备信息 */
type Os struct{}

/* OS */
func (Os) System(user_agent string) string {
	switch {
	case strings.Contains(user_agent, "Win64") || strings.Contains(user_agent, "Windows NT"):
		return "Windows"
	case strings.Contains(user_agent, "Linux"):
		return "Linux"
	case strings.Contains(user_agent, "Mac OS"):
		return "MacOS"
	case strings.Contains(user_agent, "Unix"):
		return "Unix"
	default:
		return "Other"
	}
}

/* Browser */
func (Os) Browser(user_agent string) string {
	switch {
	case strings.Contains(user_agent, "MSIE"):
		return "IE"
	case strings.Contains(user_agent, "Netscape"):
		return "Netscape"
	case strings.Contains(user_agent, "Opera"):
		return "Opera"
	case strings.Contains(user_agent, "Firefox"):
		return "Firefox"
	case strings.Contains(user_agent, "Chrome"):
		return "Chrome"
	case strings.Contains(user_agent, "Safari"):
		return "Safari"
	default:
		return "Other"
	}
}
