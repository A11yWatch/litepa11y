fn main() -> Result<(), Box<std::error::Error>> {
    let mut args = std::env::args_os();
    let mut next = || args.next().ok_or("Usage: victor input.html output.pdf");
    let _self = next()?;
    let input = next()?;
    let output = next()?;
    let bytes = std::fs::read(&input)?;
    let doc = victor_tree::dom::Document::parse_html(&bytes);
    Ok(())
}
