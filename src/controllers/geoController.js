import axios from "axios";
import { SearchHistory } from "../models/SearchHistory.js";

const IPINFO_BASE_URL = "https://ipinfo.io";

export const getCurrentGeo = async (req, res) => {
  try {
    const token = process.env.IPINFO_TOKEN
      ? `?token=${process.env.IPINFO_TOKEN}`
      : "";
    const response = await axios.get(`${IPINFO_BASE_URL}/geo${token}`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch geolocation data" });
  }
};

export const searchIP = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  // Basic IP validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
    return res.status(400).json({ error: "Invalid IP address format" });
  }

  try {
    const token = process.env.IPINFO_TOKEN
      ? `?token=${process.env.IPINFO_TOKEN}`
      : "";
    const response = await axios.get(`${IPINFO_BASE_URL}/${ip}${token}`);

    // Save to history
    SearchHistory.create(req.userId, ip, response.data);

    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "IP address not found" });
    }
    res.status(500).json({ error: "Failed to fetch IP geolocation data" });
  }
};

export const getHistory = (req, res) => {
  try {
    const history = SearchHistory.findByUserId(req.userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search history" });
  }
};

export const deleteHistory = (req, res) => {
  const { id } = req.params;

  try {
    const deleted = SearchHistory.deleteById(parseInt(id), req.userId);

    if (!deleted) {
      return res.status(404).json({ error: "History item not found" });
    }

    res.json({ message: "History item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete history item" });
  }
};

export const deleteMultipleHistory = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid IDs provided" });
  }

  try {
    const deletedCount = SearchHistory.deleteMultiple(ids, req.userId);
    res.json({
      message: `${deletedCount} history item(s) deleted successfully`,
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete history items" });
  }
};
