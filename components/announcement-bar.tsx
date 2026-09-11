function AnnouncementGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="announcement-group" aria-hidden={hidden}>
      <span>Complimentary Lagos delivery on orders over ₦60,000</span>
      <span className="announcement-divider" aria-hidden="true">
        ·
      </span>
      <span>Made in Lagos · Shipping worldwide</span>
      <span className="announcement-divider" aria-hidden="true">
        ·
      </span>
    </span>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      role="region"
      aria-label="Ahumma delivery announcement"
    >
      <div className="announcement-track">
        <AnnouncementGroup />
        <AnnouncementGroup hidden />
        <AnnouncementGroup hidden />
        <AnnouncementGroup hidden />
      </div>
    </div>
  );
}
