/**
 * Required uploads templates based on coaching category
 * Generates the upload checklist for each order type
 */

import type {
  CoachingCategory,
  SwingSubCategory,
  ShortGameSubCategory,
  RequiredUpload,
} from "./types";

/**
 * Generate required uploads for swing analysis
 */
function getSwingUploads(subCategory?: SwingSubCategory): RequiredUpload[] {
  const uploads: RequiredUpload[] = [];

  // Driver videos (always needed for off_the_tee or both)
  if (subCategory === "off_the_tee" || subCategory === "both" || !subCategory) {
    uploads.push(
      {
        key: "driver_face_on",
        label: "Driver - Face On",
        angle: "face_on",
        clubOrDistance: "driver",
      },
      {
        key: "driver_down_the_line",
        label: "Driver - Down the Line",
        angle: "down_the_line",
        clubOrDistance: "driver",
      }
    );
  }

  // 7 iron and wedge (always needed for approach or both)
  if (subCategory === "approach" || subCategory === "both" || !subCategory) {
    uploads.push(
      {
        key: "7iron_face_on",
        label: "7 Iron - Face On",
        angle: "face_on",
        clubOrDistance: "7 iron",
      },
      {
        key: "7iron_down_the_line",
        label: "7 Iron - Down the Line",
        angle: "down_the_line",
        clubOrDistance: "7 iron",
      },
      {
        key: "wedge_face_on",
        label: "Wedge - Face On",
        angle: "face_on",
        clubOrDistance: "wedge",
      },
      {
        key: "wedge_down_the_line",
        label: "Wedge - Down the Line",
        angle: "down_the_line",
        clubOrDistance: "wedge",
      }
    );
  }

  return uploads;
}

/**
 * Generate required uploads for short game analysis
 */
function getShortGameUploads(
  subCategory?: ShortGameSubCategory
): RequiredUpload[] {
  const uploads: RequiredUpload[] = [
    {
      key: "chip_face_on",
      label: "Traditional Chip - Face On",
      angle: "face_on",
      clubOrDistance: "highest lofted wedge",
    },
    {
      key: "chip_down_the_line",
      label: "Traditional Chip - Down the Line",
      angle: "down_the_line",
      clubOrDistance: "highest lofted wedge",
    },
  ];

  if (subCategory === "chipping") {
    uploads.push(
      {
        key: "flop_face_on",
        label: "Flop Shot - Face On",
        angle: "face_on",
        clubOrDistance: "lob wedge",
      },
      {
        key: "flop_down_the_line",
        label: "Flop Shot - Down the Line",
        angle: "down_the_line",
        clubOrDistance: "lob wedge",
      }
    );
  }

  if (subCategory === "bunker") {
    uploads.push(
      {
        key: "bunker_face_on",
        label: "Bunker Shot - Face On",
        angle: "face_on",
        clubOrDistance: "sand wedge",
      },
      {
        key: "bunker_down_the_line",
        label: "Bunker Shot - Down the Line",
        angle: "down_the_line",
        clubOrDistance: "sand wedge",
      }
    );
  }

  return uploads;
}

/**
 * Generate required uploads for putting analysis
 */
function getPuttingUploads(): RequiredUpload[] {
  return [
    {
      key: "putt_3ft",
      label: "Putting - 3 Feet (Face On)",
      angle: "face_on",
      clubOrDistance: "3 feet",
    },
    {
      key: "putt_10ft",
      label: "Putting - 10 Feet (Face On)",
      angle: "face_on",
      clubOrDistance: "10 feet",
    },
    {
      key: "putt_30ft",
      label: "Putting - 30 Feet (Face On)",
      angle: "face_on",
      clubOrDistance: "30 feet",
    },
  ];
}

/**
 * Generate required uploads based on category and sub-category
 */
export function getRequiredUploads(
  category: CoachingCategory,
  subCategory?: SwingSubCategory | ShortGameSubCategory
): RequiredUpload[] {
  switch (category) {
    case "swing":
      return getSwingUploads(subCategory as SwingSubCategory);
    case "short_game":
      return getShortGameUploads(subCategory as ShortGameSubCategory);
    case "putting":
      return getPuttingUploads();
    case "course_management":
      // No videos required for course management
      return [];
    default:
      return [];
  }
}
