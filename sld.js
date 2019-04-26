
export function getNetwerkSld(stroke = '#19C800', strokeWidth = 2, strokeOpacity = 1) {
    return `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>\
    <sld:StyledLayerDescriptor version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink">\
    <sld:NamedLayer>\
        <sld:Name>fietsknooppuntennetwerk:netwerken</sld:Name>\
        <sld:UserStyle>\
        <sld:Name>Style1</sld:Name>\
        <sld:FeatureTypeStyle>\
            <!--<sld:FeatureTypeName>fietsknooppuntnetwerk</sld:FeatureTypeName>-->\
            <sld:Rule>\
            <sld:Name>fietsknooppuntnetwerk</sld:Name>\
            <sld:Title>fietsknooppuntnetwerk</sld:Title>\
            <sld:MaxScaleDenominator>270000</sld:MaxScaleDenominator>\

            <sld:LineSymbolizer>\
                <sld:Stroke>\
                <sld:CssParameter name="stroke">#ffffff</sld:CssParameter>\
                <sld:CssParameter name="stroke-width">${strokeWidth + 2}</sld:CssParameter>\
                <sld:CssParameter name="stroke-opacity">${strokeOpacity}</sld:CssParameter>\
                </sld:Stroke>\
                </sld:LineSymbolizer>\
                <sld:LineSymbolizer>\
                <sld:Stroke>\
                <sld:CssParameter name="stroke">${stroke}</sld:CssParameter>\
                <sld:CssParameter name="stroke-width">${strokeWidth}</sld:CssParameter>\
                <sld:CssParameter name="stroke-opacity">${strokeOpacity}</sld:CssParameter>\
                </sld:Stroke>\
            </sld:LineSymbolizer>\
            </sld:Rule>\
        </sld:FeatureTypeStyle>\
        </sld:UserStyle>\
    </sld:NamedLayer>\
    </sld:StyledLayerDescriptor>`
}

export function getKnooppuntSld(layername, fontSize = '10', fontColor = '#19C800'){
    return `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>\
    <sld:StyledLayerDescriptor version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink">\
      <sld:NamedLayer>\
        <sld:Name>${layername}</sld:Name>\
        <sld:UserStyle>\
          <sld:Name>Style1</sld:Name>\
          <sld:FeatureTypeStyle>\
            <!--<sld:FeatureTypeName>fietsknooppunten</sld:FeatureTypeName>-->\
            <sld:Rule>\
              <sld:Name>fietsknooppunten</sld:Name>\
              <sld:Title>fietsknooppunten</sld:Title>\
              <sld:MaxScaleDenominator>270000</sld:MaxScaleDenominator>\
              <sld:TextSymbolizer>\
                <sld:Label>\
                  <ogc:PropertyName>knooppuntn</ogc:PropertyName>\
                </sld:Label>\
                <sld:Font>\
                  <sld:CssParameter name="font-family">Arial</sld:CssParameter>\
                  <sld:CssParameter name="font-family">SansSerif</sld:CssParameter>\
                  <sld:CssParameter name="font-size">${fontSize}</sld:CssParameter>\
                  <sld:CssParameter name="font-style">normal</sld:CssParameter>\
                  <sld:CssParameter name="font-weight">normal</sld:CssParameter>\
                </sld:Font>\
                <sld:LabelPlacement>\
                  <sld:PointPlacement>\
                    <sld:AnchorPoint>\
                      <sld:AnchorPointX>0.75</sld:AnchorPointX>\
                      <sld:AnchorPointY>0.75</sld:AnchorPointY>\
                    </sld:AnchorPoint>\
                  </sld:PointPlacement>\
                </sld:LabelPlacement>\
                <sld:Halo>\
                  <sld:Radius>3</sld:Radius>\
                  <sld:Fill>\
                    <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>\
                    <sld:CssParameter name="fill-opacity">1.0</sld:CssParameter>\
                  </sld:Fill>\
                </sld:Halo>\
                <sld:Fill>\
                  <sld:CssParameter name="fill">${fontColor}</sld:CssParameter>\
                  <sld:CssParameter name="fill-opacity">1.0</sld:CssParameter>\
                </sld:Fill>\
              </sld:TextSymbolizer>\
            </sld:Rule>\
          </sld:FeatureTypeStyle>\
        </sld:UserStyle>\
      </sld:NamedLayer>\
    </sld:StyledLayerDescriptor>`
}


export function getWegdekSld(){
  return '<?xml version="1.0" encoding="UTF-8"?>\
<sld:StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">\
	<sld:NamedLayer>\
		<sld:Name>fietsnetwerk:wegdek fietstraject</sld:Name>\
		<sld:UserStyle>\
			<sld:Name>lineSymbolizer</sld:Name>\
			<sld:Title>lineSymbolizer</sld:Title>\
			<sld:FeatureTypeStyle>\
				<sld:Rule>		\
					<sld:LineSymbolizer>\
						<sld:Stroke>\
							<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>\
							<sld:CssParameter name="stroke-opacity">1</sld:CssParameter>\
							<sld:CssParameter name="stroke-width">2</sld:CssParameter>\
						</sld:Stroke>\
					</sld:LineSymbolizer>		\
				</sld:Rule>\
			</sld:FeatureTypeStyle>\
		</sld:UserStyle>\
	</sld:NamedLayer>\
</sld:StyledLayerDescriptor>'
}