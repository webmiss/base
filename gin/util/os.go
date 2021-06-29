package util

import "strings"

/* 设备信息 */
type Os struct{}

/* OS */
func (Os) System(user_agent string) string {
	switch {
	case strings.Contains(user_agent, "win") || strings.Contains(user_agent, "Win"):
		return "Windows"
	case strings.Contains(user_agent, "linux") || strings.Contains(user_agent, "Linux"):
		return "Linux"
	case strings.Contains(user_agent, "Mac"):
		return "MacOS"
	case strings.Contains(user_agent, "unix") || strings.Contains(user_agent, "Unix") || strings.Contains(user_agent, "BSD") || strings.Contains(user_agent, "HPUX"):
		return "Unix"
	default:
		return "Other"
	}
}

/* Browser */
func (Os) Browser(user_agent string) string {
	switch {
	case strings.Contains(user_agent, "Maxthon") || strings.Contains(user_agent, "MSIE"):
		return "IE"
	case strings.Contains(user_agent, "Chrome"):
		return "Chrome"
	case strings.Contains(user_agent, "Firefox") || strings.Contains(user_agent, "Mozilla"):
		return "Firefox"
	case strings.Contains(user_agent, "Opera"):
		return "Opera"
	case strings.Contains(user_agent, "Safari"):
		return "Safari"
	case strings.Contains(user_agent, "Netscape"):
		return "Netscape"
	default:
		return "Other"
	}
}
